import angular from "angular";
import config from 'app/core/config';
import {appEvents} from 'app/core/core';
import _ from 'lodash';

export class DashPanelsEditorCtrl {
  dashboard: any;

  stats: any;

  /** @ngInject */
  constructor(private $scope, $rootScope) {

    console.log( 'panels', this.dashboard.panels, $scope );
    $scope.ctrl = this;  // not sure why?

    this.updateStats();
  }

  updateStats() {
    let stats = {
      alerts: 0,
      sources: [],
      descriptions: 0,
      skip: {} // id = true
    };
    let sources = {};

    _.forEach(this.dashboard.panels, panel => {
      if (panel.alert) {
        stats.alerts++;
      }
      if (panel.description) {
        stats.descriptions++;
      }
      if (panel.datasource) {
        if (_.has(sources, panel.datasource)) {
          sources[panel.datasource].count++;
        } else {
          sources[panel.datasource] = {
            name: panel.datasource,
            count: 1,
            id: 0
          };
        }
      }
    });
    stats.sources = _.sortBy( _.values(sources), ['-count'] );

    this.stats = stats;
  }

  getIconFor( panel ) {
    if (panel) {
      let meta = config.panels[panel.type];
      if (_.has(meta, 'info.logos')) {
        let logos = meta.info.logos;
        if (logos.small != null) {
          return logos.small;
        }
        if (logos.large != null) {
          return logos.large;
        }
      }
    }
    return '/public/img/icn-panel.svg';
  }

  // Copiedfrom panel_ctrl... can we use the same one?
  removePanel(panel, ask?: boolean) {
    // confirm deletion
    if (ask !== false) {
      var text2, confirmText;

      if (panel.alert) {
        text2 = "Panel includes an alert rule, removing panel will also remove alert rule";
        confirmText = "YES";
      }

      appEvents.emit('confirm-modal', {
        title: 'Remove Panel',
        text: 'Are you sure you want to remove this panel?',
        text2: text2,
        icon: 'fa-trash',
        confirmText: confirmText,
        yesText: 'Remove',
        onConfirm: () => {
          this.removePanel(panel, false);
        }
      });
      return;
    }
    this.dashboard.removePanel(panel);
  }


  // Copiedfrom panel_ctrl... can we use the same one?
  editPanelJson( panel ) {

    console.log( 'json', panel, this );
    let editScope = this.$scope.$root.$new();
     editScope.object = panel.getSaveModel();
  //   editScope.updateHandler = pctrl.bind(this);
     this.$scope.$root.appEvent('show-modal', {
       src: 'public/app/partials/edit_json.html',
       scope: editScope
     });
  }
}

function dashPanelsEditor() {
  return {
    restrict: "E",
    controller: DashPanelsEditorCtrl,
    templateUrl: "public/app/features/dashboard/settings/panels.html",
    bindToController: true,
    controllerAs: "ctrl",
    scope: {
      dashboard: "="
    }
  };
}

angular
  .module("grafana.directives")
  .directive("dashPanelsEditor", dashPanelsEditor);

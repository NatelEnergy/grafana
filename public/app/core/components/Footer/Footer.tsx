import React, { FC } from 'react';
import { Tooltip } from '@grafana/ui';

interface Props {
  appName: string;
  buildVersion: string;
  buildCommit: string;
  newGrafanaVersionExists: boolean;
  newGrafanaVersion: string;
}

export const Footer: FC<Props> = React.memo(
  ({ appName, buildVersion, buildCommit, newGrafanaVersionExists, newGrafanaVersion }) => {
    return (
      <footer className="footer">
        <div className="text-center">
          <ul>
            <li>
              <a href="https://upstream.tech/" target="_blank">
                Upstream Tech
              </a>
            </li>
            <li>
              <a href="https://grafana.com" target="_blank"
                title={`(commit: ${buildCommit})`}>
                v{buildVersion}
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
);

export default Footer;

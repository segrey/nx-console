import { getOutputChannel } from '@nx-console/vscode/output-channels';
import { TelemetryLogger, TelemetrySender, env } from 'vscode';
import { GoogleAnalyticsSender } from './google-analytics-sender';
import { LoggerSender } from './logger-sender';
import { TelemetryData, TelemetryEvents } from './telemetry-types';

let telemetry: NxConsoleTelemetryLogger;

export function getTelemetry() {
  return telemetry;
}

export function initTelemetry(production: boolean) {
  const telemetrySender: TelemetrySender = production
    ? new GoogleAnalyticsSender(production)
    : new LoggerSender();

  telemetry = env.createTelemetryLogger(telemetrySender, {
    ignoreBuiltInCommonProperties: true,
  });

  getOutputChannel().appendLine(
    `Telemetry: ${production ? 'production' : 'development'}`
  );
}

export interface NxConsoleTelemetryLogger extends TelemetryLogger {
  logUsage(eventName: TelemetryEvents, data?: TelemetryData): void;
}
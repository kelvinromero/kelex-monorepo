require 'opentelemetry/sdk'
require 'opentelemetry/exporter/otlp'
require 'opentelemetry/instrumentation/all'

OpenTelemetry::SDK.configure do |c|
    c.logger = ActiveSupport::Logger.new(STDOUT)
    c.use_all()
end
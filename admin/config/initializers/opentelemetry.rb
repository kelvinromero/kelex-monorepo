require 'opentelemetry/sdk'
require 'opentelemetry/instrumentation/all'

OpenTelemetry::SDK.configure do |c|
  c.logger = Logger.new(STDOUT)
  c.use_all() # enables all instrumentation!
end
# frozen_string_literal: true

class BunnyClient
  def initialize
    @connection = Bunny.new(hostname: 'rabbitmq', user: 'admin', password: 'admin')
    @connection.start
    @channel = @connection.create_channel
  end

  def publish(message)
    @channel.default_exchange.publish(message, routing_key: queue.name)
  end

  private

  def queue
    @queue ||= @channel.queue('podcast.episode.published')
  end
end
package com.abharatha.JavaSpringBoot.RabbitProducer;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

/**
 * Represents a connection with a queue
 * @author Aravind
 *
 */
public abstract class EndPoint{
	
    protected Channel channel;
    protected Connection connection;
    protected String endPointName;
	private static final String QUEUE_NAME = "zeus.queue";
	
    public EndPoint() throws IOException, TimeoutException{
         this.endPointName = QUEUE_NAME;
		
         //Create a connection factory
         ConnectionFactory factory = new ConnectionFactory();
	    
         //hostname of your rabbitmq server
         factory.setHost("localhost");
		
         //getting a connection
         connection = factory.newConnection();
	    
         //creating a channel
         channel = connection.createChannel();
	    
         //declaring a queue for this channel. If queue does not exist,
         //it will be created on the server.
         channel.queueDeclare(QUEUE_NAME, false, false, false, null);
    }
	
	
    /**
     * Close channel and connection. Not necessary as it happens implicitly any way. 
     * @throws IOException
     * @throws TimeoutException 
     */
     public void close() throws IOException, TimeoutException{
         this.channel.close();
         this.connection.close();
     }
}
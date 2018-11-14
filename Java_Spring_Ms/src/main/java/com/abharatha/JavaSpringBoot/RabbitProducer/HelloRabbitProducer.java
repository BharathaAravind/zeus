package com.abharatha.JavaSpringBoot.RabbitProducer;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abharatha.JavaSpringBoot.entity.RecoQueueMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class HelloRabbitProducer extends EndPoint {

	private static final Logger logger = LogManager.getLogger("com.abharatha.JavaSpringBoot");
	private static final String QUEUE_NAME = "zeus.queue";

	public HelloRabbitProducer() throws IOException, TimeoutException {
		super();
	}

	@Autowired
	private RabbitTemplate rabbitTemplate;
	
	ObjectMapper mapper = new ObjectMapper();
	
	
	public void sendMessage(RecoQueueMessage obj) throws JsonProcessingException {
		String jsonInString = mapper.writeValueAsString(obj);

		//var json = ObjectMapper.w
		rabbitTemplate.convertAndSend(QUEUE_NAME, jsonInString);
	}
}

package com.savproj.db;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
/**
 * 
 * @author tuanaphan
 *
 */
public final class DBConnectionFactory {
	private static final String HOST_DB = "localhost";
	private static final int PORT_DB = 27017;
	private static final String DB_NAME = "savproj_db";
	
	private static MongoDatabase mgDb;
	
	public static MongoDatabase createDbConnection() {
		if (mgDb == null) {
			MongoClient mgClient = new MongoClient(new MongoClientURI("mongodb://" + HOST_DB + ":" + PORT_DB));
			mgDb = mgClient.getDatabase(DB_NAME);
		}
		
		return mgDb;
	}
}

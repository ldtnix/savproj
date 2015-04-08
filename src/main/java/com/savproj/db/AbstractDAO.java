package com.savproj.db;

import org.bson.Document;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class AbstractDAO {

	public MongoCollection<Document> getCollection(String coll) {
		MongoDatabase db = DBConnectionFactory.createDbConnection();
		return db.getCollection(coll);
	}
}

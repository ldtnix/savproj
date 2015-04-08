package com.savproj.db;

import org.bson.Document;
import org.json.simple.JSONObject;

/**
 * 
 * @author tuanaphan
 *
 */
public class VoteDAO extends AbstractDAO {

	private static final String COLL = "votes";
	private static final String KEY = "secretCode";
	
	public void insert(JSONObject voteJs) {
		Document voteDc = new Document(KEY, voteJs.get(KEY));
		
		for (Object k : voteJs.keySet()) {
			String key = (String) k;
			voteDc.append(key, voteJs.get(key));
		}
		
		getCollection(COLL).insertOne(voteDc);
	}
}

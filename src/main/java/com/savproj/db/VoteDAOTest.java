package com.savproj.db;

import org.json.simple.JSONObject;

import junit.framework.TestCase;

public class VoteDAOTest extends TestCase {

	public void testInsert() {
		VoteDAO dao = new VoteDAO();
		JSONObject voteJs = new JSONObject();
		voteJs.put("secretCode", "123");
		voteJs.put("title", "Hom nay an gi");
		
		dao.insert(voteJs);
	}

}

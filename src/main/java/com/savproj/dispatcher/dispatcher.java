package com.savproj.dispatcher;

import static spark.Spark.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;

import com.savproj.ctrl.BaseCtrl;

import spark.Request;
import spark.Response;
import spark.Route;


/**
 * 
 * @author tuyenlieu
 * @purpose: This dispatcher serves as a basic navigator which receives the requests from clients
 * 			 and navigate them to corresponding controller.
 */
public class dispatcher {
	
	 
	 public static void main(String[] args) {
		 
	        get(new Route("/getData/:secretCode") {
	            @SuppressWarnings("unchecked")
				@Override
	            public Object handle(Request request, Response response) {
	            	String secretCode = request.queryParams(":secretCode");
	            	JSONArray jSonArray = new Json/...;
	            	//
	            	jSonArray = Util.retrieve(secretCode);
	            	return jSonArray.toJSONString();
	            }

			
	        });
	        
	        put(new Route("/save/:secretCode") {
	            @Override
	            public Object handle(Request request, Response response) {
	            	String secretCode = request.queryParams(":secretCode");
	            	JSonArray data = (JSonArray) request.attribute(secretCode);
	            	if(Util.save(data)) {
	            		 return "unsuccessfull";
	            	} else {
	            		return "failed";
	            	}
	            }
	        });
	    }
}

package com.example.MEEPS;

import com.example.MEEPS.entity.geocodeDTO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class MeepsApplication implements CommandLineRunner {

//	private final healthService healthService;

	public static void main(String[] args) {
		SpringApplication.run(MeepsApplication.class, args); }

	@Override
	public void run(String... args ) throws Exception {

//		File file = new File("/coords.json");
		//	 "geometry": { "location": {"lat": 37.4222804, "lng": -122.084342}}

//		Map<String, Integer> hm = new HashMap<String, Integer>();
//		RestTemplate restTemplate = new RestTemplate();
//		ObjectMapper objectMapper = new ObjectMapper();
//		HealthService healthService = new healthServiceImplementation(restTemplate, objectMapper);
//		hm.put("lat", 37);
//		hm.put("lng", -122);
//		System.out.println(hm);
//
//		Map<String, Map<String, Integer>> location = new HashMap<>();
//		location.put("location", hm);
//
//		Map<String, Map<String, Map<String, Integer>>> geometry = new HashMap<>();
//
//		geometry.put("geometry", location);
//
//
//		System.out.println("geometry:" + geometry);

//		String test = HealthServiceImplementation.translateCoordinates();

//		System.out.println(test);

		//	String content = FileUtils.readFileToString(file, "UTF-8");
		//	System.out.println("test");

		geocodeDTO geocodeDTO = new geocodeDTO();



	}


}

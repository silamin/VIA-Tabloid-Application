package com.example.backendv1;

import com.example.backendv1.model.Story;
import com.example.backendv1.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

  @Autowired
  private StoryRepository storyRepository;

  @Override
  public void run(String... args) throws Exception {
    // Check if the database already has stories, if not, seed the data
    if (storyRepository.count() == 0) {
      seedDatabase();
    }
  }

  private void seedDatabase() {
    // Create stories for different departments
    Story story1 = new Story();
    story1.setTitle("Aliens Found in VIA University Parking Lot!");
    story1.setContent("Students have reported seeing unusual lights and strange figures near the parking lot. Experts are baffled!");
    story1.setDepartment("Science");

    Story story2 = new Story();
    story2.setTitle("The Secret Life of VIA Professors - They Are Superheroes!");
    story2.setContent("Exclusive interviews reveal that some professors might just be hiding a secret alter ego as masked vigilantes.");
    story2.setDepartment("Science");

    Story story3 = new Story();
    story3.setTitle("VIA Students Hack the School System and Reap the Rewards!");
    story3.setContent("A group of brilliant students has bypassed the school’s digital security, but what they found was far more than they expected.");
    story3.setDepartment("Technology");

    Story story4 = new Story();
    story4.setTitle("VIA’s Biggest Mystery: Who Really Runs the Cafeteria?");
    story4.setContent("After years of speculation, some believe the cafeteria is secretly run by an elite student council.");
    story4.setDepartment("Business");

    Story story5 = new Story();
    story5.setTitle("Breaking: VIA Business Students Make a Fortune Trading Cryptocurrency!");
    story5.setContent("In a shocking turn of events, a group of students has made millions by trading Bitcoin and Ethereum.");
    story5.setDepartment("Business");

    Story story6 = new Story();
    story6.setTitle("The Truth Behind VIA’s Haunted Dormitory: An Investigation");
    story6.setContent("Is VIA’s oldest dormitory truly haunted? Our investigative team spent the night to uncover what lurks within.");
    story6.setDepartment("Student Life");

    Story story7 = new Story();
    story7.setTitle("VIA Students Build First Fully Functional AI Robot That Beats Humans!");
    story7.setContent("A group of students has built an AI robot capable of solving complex problems faster than any human!");
    story7.setDepartment("Technology");

    Story story8 = new Story();
    story8.setTitle("The Secret Recipe of VIA’s Legendary Pizza Unveiled!");
    story8.setContent("After years of secrecy, the formula for the beloved VIA pizza has been leaked. Is it magic or science?");
    story8.setDepartment("Student Life");

    Story story9 = new Story();
    story9.setTitle("VIA Professor Discovered to Be a Former FBI Agent!");
    story9.setContent("One of the most respected professors at VIA has revealed his secret past as an FBI agent!");
    story9.setDepartment("Science");

    Story story10 = new Story();
    story10.setTitle("The Untold Story of VIA’s Annual Charity Event - A Hidden Agenda?");
    story10.setContent("What really happens behind the scenes of the school’s famous charity event? We went undercover to find out.");
    story10.setDepartment("Business");

    Story story11 = new Story();
    story11.setTitle("Is VIA’s Popular Professor Actually a Time Traveler?");
    story11.setContent("One professor's odd behavior has led students to believe he might be traveling through time. We dive deep into this theory.");
    story11.setDepartment("Science");

    Story story12 = new Story();
    story12.setTitle("VIA’s Underdog Team Wins National Sports Championship!");
    story12.setContent("Against all odds, VIA's underdog sports team takes home the championship, shocking competitors and fans alike.");
    story12.setDepartment("Student Life");

    // Save the stories into the database
    storyRepository.save(story1);
    storyRepository.save(story2);
    storyRepository.save(story3);
    storyRepository.save(story4);
    storyRepository.save(story5);
    storyRepository.save(story6);
    storyRepository.save(story7);
    storyRepository.save(story8);
    storyRepository.save(story9);
    storyRepository.save(story10);
    storyRepository.save(story11);
    storyRepository.save(story12);

    System.out.println("12 Mock stories have been seeded!");
  }
}


import Qcard from "./questionCard";
import QuestionMark from "./icons/q";
import Sick from "./icons/sick";
import Child from "./icons/child";
import Pet from "./icons/pets";
import Spread from "./icons/spread";

export default function BasicKnowledge() {
  const questions = [
    {
      question: "What is covid-19?",
      answer:
        "COVID-19 is a disease caused by a virus called SARS-CoV-2. Most people with COVID-19 have mild symptoms, but some people can become severely ill. Although most people with COVID-19 get better within weeks of illness, some people experience post-COVID conditions. Post-COVID conditions are a wide range of new, returning, or ongoing health problems people can experience more than four weeks after first being infected with the virus that causes COVID-19. Older people and those who have certain underlying medical conditions are more likely to get severely ill from COVID-19. Vaccines against COVID-19 are safe and effective.",
    },
    {
      question: "How does the virus sread?",
      answer:
        "COVID-19 spreads when an infected person breathes out droplets and very small particles that contain the virus. These droplets and particles can be breathed in by other people or land on their eyes, noses, or mouth. In some circumstances, they may contaminate surfaces they touch. People who are closer than 6 feet from the infected person are most likely to get infected.\nCOVID-19 is spread in three main ways:\nBreathing in air when close to an infected person who is exhaling small droplets and particles that contain the virus.\nHaving these small droplets and particles that contain virus land on the eyes, nose, or mouth, especially through splashes and sprays like a cough or sneeze.\nTouching eyes, nose, or mouth with hands that have the virus on them.",
    },
    {
      question: "What should i do if i or someone in my house gets sick?",
      answer:
        "People who have been in close contact with someone who has COVID-19—excluding people who have had COVID-19 within the past 3 months or who are fully vaccinated, people who have tested positive for COVID-19 within the past 3 months and recovered do not have to quarantine or get tested again as long as they do not develop new symptoms.People who develop symptoms again within 3 months of their first bout of COVID-19 may need to be tested again if there is no other cause identified for their symptoms, people who have been in close contact with someone who has COVID-19 are not required to quarantine if they have been fully vaccinated against the disease and show no symptoms. For more information, Visit our dedicated section of what to do if you were sick.",
    },
    {
      question: "Can wild animals spread the virus to people or pets?",
      answer:
        "Currently, there is no evidence to suggest the virus that causes COVID-19 is circulating in free-living wildlife in the United States, or that wildlife might be a source of infection for people in the United States.",
    },
    {
      question: "What is the risk of my child becoming sick with Covid-19",
      answer:
        "Children can be infected with the virus that causes COVID-19 and can get sick with COVID-19. Most children with COVID-19 have mild symptoms or they may have no symptoms at all (“asymptomatic”). Fewer children have been sick with COVID-19 compared to adults. Babies younger than 1 and children with certain underlying medical conditions may be more likely to have serious illness from COVID-19. Some children have developed a rare but serious disease that is linked to COVID-19 called multisystem inflammatory syndrome (MIS-C).",
    },
  ];
  return (
    <div>
      <Qcard data={questions[0]}>
        <QuestionMark></QuestionMark>
      </Qcard>
      <Qcard data={questions[1]}>
        <Spread></Spread>
      </Qcard>
      <Qcard data={questions[2]}>
        <Sick></Sick>
      </Qcard>
      <Qcard data={questions[3]}>
        <Pet></Pet>
      </Qcard>
      <Qcard data={questions[4]}>
        <Child></Child>
      </Qcard>
    </div>
  );
}

import SkillCategory from './SkillCategory';

function Skills() {
  const skillsData = [
    {
      area: "FrontEnd",
      proficiencies: ["React", "Redux", "Angular", "RxJs", "SASS", "Webpack"]
    },
    {
      area: "BackEnd",
      proficiencies: ["Go", "Node.js", "Express"]
    },
    {
      area: "CI/CD",
      proficiencies: ["CircleCI", "GitHub Actions"]
    },
    {
      area: "DevOps",
      proficiencies: ["Docker", "Ansible", "Fastlane", "Nginx", "Makefile"]
    },
    {
      area: "Bots",
      proficiencies: ["Botkit", "Rasa"]
    },
    {
      area: "UI Frameworks",
      proficiencies: ["Bootstrap", "Tailwind CSS"]
    },
    {
      area: "Web technologies",
      proficiencies: ["HTML5", "CSS3", "ES7+", "a11y"]
    },
    {
      area: "Databases",
      proficiencies: ["MySQL", "SQL Server"]
    },
    {
      area: "Misc",
      proficiencies: ["Git", "Eslint", "Prettier", "Typescript"]
    },
    {
      area: "Languages",
      proficiencies: ["JavaScript", "C#", "C++", "Java"]
    }
  ];

  return (
    <section className="py-16" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl text-white text-center mb-12">
          <span className="mr-2">⚡</span>
          Technical Skills
          <span className="ml-2">⚡</span>
        </h2>
        
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {skillsData.map((category, index) => (
            <SkillCategory
              key={index}
              area={category.area}
              proficiencies={category.proficiencies}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

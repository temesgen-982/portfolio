import SkillCategory from './SkillCategory';

function Skills() {
  const skillsData = [
    {
      area: "FrontEnd",
      proficiencies: [
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "React", level: 90 },
        { name: "SASS", level: 85 }
      ]
    },
    // {
    //   area: "BackEnd",
    //   proficiencies: [
    //     { name: "Go", level: 75 },
    //     { name: "Node.js", level: 85 },
    //     { name: "Express", level: 80 }
    //   ]
    // },
    // {
    //   area: "CI/CD",
    //   proficiencies: [
    //     { name: "CircleCI", level: 75 },
    //     { name: "GitHub Actions", level: 80 }
    //   ]
    // },
    // {
    //   area: "DevOps",
    //   proficiencies: [
    //     { name: "Docker", level: 85 },
    //     { name: "Ansible", level: 70 },
    //     { name: "Fastlane", level: 65 },
    //     { name: "Nginx", level: 75 },
    //     { name: "Makefile", level: 70 }
    //   ]
    // },
    // {
    //   area: "Bots",
    //   proficiencies: [
    //     { name: "Botkit", level: 70 },
    //     { name: "Rasa", level: 65 }
    //   ]
    // },
    {
      area: "UI Frameworks",
      proficiencies: [
        { name: "Bootstrap", level: 90 },
        { name: "Tailwind CSS", level: 85 }
      ]
    },
    // {
    //   area: "Web technologies",
    //   proficiencies: [
        
    //     // { name: "ES7+", level: 85 },
    //     // { name: "a11y", level: 75 }
    //   ]
    // },
    {
      area: "Databases",
      proficiencies: [
        { name: "MySQL", level: 80 },
        { name: "SQL Server", level: 75 }
      ]
    },
    {
      area: "Languages",
      proficiencies: [
        { name: "JavaScript", level: 95 },
        { name: "C#", level: 80 },
        { name: "C++", level: 85 },
        { name: "Java", level: 65 }
      ]
    },
    {
      area: "Misc",
      proficiencies: [
        { name: "Git", level: 90 },
        // { name: "Eslint", level: 85 },
        // { name: "Prettier", level: 85 },
        // { name: "Typescript", level: 80 }
      ]
    }
  ];

  return (
    <section className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] py-8 overflow-y-auto" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl dark:text-white text-neutral-900 text-center mb-8 sm:mb-12">
          Technical Skills
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-auto gap-4 sm:gap-6 max-w-6xl mx-auto">
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

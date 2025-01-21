import { 
  FaReact, FaNodeJs, FaSass, 
  FaGithub, FaJava, FaHtml5, FaCss3, FaBootstrap,
  FaGitAlt, FaNpm
} from 'react-icons/fa'
import { 
  SiTypescript, SiMysql,
  SiExpress, SiWebpack, SiCircleci, SiGithubactions,
  SiNginx, SiRedux, SiFirebase, SiTailwindcss,
  SiJavascript, SiCplusplus
} from 'react-icons/si'
import { DiMsqlServer } from 'react-icons/di'
import { TbBrandGolang, TbBrandCSharp } from 'react-icons/tb'

const skillsConfig = {
  'React': { icon: FaReact, color: '#61DAFB' },
  'Redux': { icon: SiRedux, color: '#764ABC' },
  'SASS': { icon: FaSass, color: '#CC6699' },
  'Webpack': { icon: SiWebpack, color: '#8DD6F9' },
  'Go': { icon: TbBrandGolang, color: '#00ADD8' },
  'Node.js': { icon: FaNodeJs, color: '#339933' },
  'Express': { icon: SiExpress, color: '#000000' },
  'CircleCI': { icon: SiCircleci, color: '#343434' },
  'GitHub Actions': { icon: SiGithubactions, color: '#2088FF' },
  'Nginx': { icon: SiNginx, color: '#009639' },
  'HTML5': { icon: FaHtml5, color: '#E34F26' },
  'CSS3': { icon: FaCss3, color: '#1572B6' },
  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'SQL Server': { icon: DiMsqlServer, color: '#CC2927' },
  'Git': { icon: FaGitAlt, color: '#F05032' },
  'Typescript': { icon: SiTypescript, color: '#3178C6' },
  'Java': { icon: FaJava, color: '#007396' },
  'Bootstrap': { icon: FaBootstrap, color: '#7952B3' },
  'Firebase': { icon: SiFirebase, color: '#FFCA28' },
  'npm': { icon: FaNpm, color: '#CB3837' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'C#': { icon: TbBrandCSharp, color: '#239120' },
  'C++': { icon: SiCplusplus, color: '#00599C' }
}

function SkillCategory({ area, proficiencies }) {
  return (
    <div className="dark:bg-neutral-800 bg-slate-200 border-2 dark:border-none border-black p-4 rounded-lg dark:hover:bg-neutral-700 hover:bg-slate-300 transition-colors">
      <h3 className="dark:text-white text-black font-medium mb-4">{area}</h3>
      <div className="space-y-3">
        {proficiencies.map((skill, index) => {
          const skillConfig = skillsConfig[skill.name];
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm text-gray-300">
                <div className="flex items-center gap-2 text-black dark:text-white">
                  {skillConfig && (
                    <skillConfig.icon 
                      className="w-4 h-4" 
                      style={{ color: skillConfig.color }}
                    />
                  )}
                  {skill.name}
                </div>
                <span className="dark:text-white text-black">{skill.level}%</span>
              </div>
              <div className="h-2 dark:bg-neutral-900 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${skill.level}%`,
                    backgroundColor: skillConfig ? skillConfig.color : '#666'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillCategory
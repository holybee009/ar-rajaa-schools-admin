import React from 'react';

interface Props {
    showClasses: (_:string) => void
    textTitle: string
}

const AcademicSessions = ({showClasses, textTitle}: Props) => {
  const startYear = 2024; // The starting academic year (2023/2024)
  const currentYear: number = new Date().getFullYear();
  const currentMonth: number = new Date().getMonth(); // January is 0, August is 6

  // Function to generate the list of academic years
  const generateAcademicYears = (): string[] => {
    const years: string[] = [];
    for (let year = startYear; year <= currentYear; year++) {
      if (year === currentYear && currentMonth < 7) {
        // If we are in the current year, but before August, don't add the next academic year yet
        break;
      }
      years.push(`${year}/${year + 1}`);
    }
    return years;
  };

  const academicYears = generateAcademicYears();

  return (
    <div className="mt-5 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">{textTitle}</h1>
      {academicYears.map((year) => (
      <ul className="list-disc bg-gray-100 p-5 rounded-lg shadow-lg mb-3 cursor-pointer bg-white" key={year} onClick={()=>showClasses(year)}>
          <li className="text-lg text-[#EE3A57] font-semibold w-full">
            {year} academic session
          </li>
      </ul>
      ))}
    </div>
  );
};

export default AcademicSessions;

import { useState } from 'react';

const AcademicYearDropdown: React.FC = () => {
  const currentYear: number = new Date().getFullYear(); // Get the current year
  const [selectedYear, setSelectedYear] = useState<string>(`${currentYear}/${currentYear + 1}`);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  // Generate an array of academic years (e.g., 2000/2001 to currentYear/currentYear + 1)
  const generateAcademicYears = (startYear: number): string[] => {
    const academicYears: string[] = [];
    for (let year = startYear; year <= currentYear; year++) {
      academicYears.push(`${year}/${year + 1}`);
    }
    return academicYears;
  };

  const academicYears: string[] = generateAcademicYears(2000); // Start from the year 2000

  return (
    <div>
      <label htmlFor="academicYear">Select an academic year: </label>
      <select id="academicYear" value={selectedYear} onChange={handleYearChange}>
        {academicYears.map((academicYear) => (
          <option key={academicYear} value={academicYear}>
            {academicYear}
          </option>
        ))}
      </select>
      <p>Selected Academic Year: {selectedYear}</p>
    </div>
  );
};

export default AcademicYearDropdown;

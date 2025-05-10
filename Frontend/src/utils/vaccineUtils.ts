
import { addMonths, isPast, format, addDays } from "date-fns";

export interface Vaccine {
  id: number;
  name: string;
  ageMonths: number;
  date: Date | null;
  diseases: string[];
  missed: boolean;
  missedDays: number;
}

// Function to calculate vaccine dates based on birth date
export const calculateVaccineDates = (birthDate: Date): Vaccine[] => {
  const vaccines: Vaccine[] = [
    {
      id: 1,
      name: "BCG & Hepatitis B",
      ageMonths: 0, // At birth
      date: new Date(birthDate),
      diseases: ["Tuberculosis", "Hepatitis B"],
      missed: false,
      missedDays: 0,
    },
    {
      id: 2,
      name: "Pentavalent 1 & OPV 1",
      ageMonths: 2,
      date: addMonths(new Date(birthDate), 2),
      diseases: ["Diphtheria", "Tetanus", "Pertussis", "Hepatitis B", "Hib", "Polio"],
      missed: false,
      missedDays: 0,
    },
    {
      id: 3,
      name: "Pentavalent 2 & OPV 2",
      ageMonths: 4,
      date: addMonths(new Date(birthDate), 4),
      diseases: ["Diphtheria", "Tetanus", "Pertussis", "Hepatitis B", "Hib", "Polio"],
      missed: false,
      missedDays: 0,
    },
    {
      id: 4,
      name: "Pentavalent 3 & OPV 3",
      ageMonths: 6,
      date: addMonths(new Date(birthDate), 6),
      diseases: ["Diphtheria", "Tetanus", "Pertussis", "Hepatitis B", "Hib", "Polio"],
      missed: false,
      missedDays: 0,
    },
    {
      id: 5,
      name: "Measles 1",
      ageMonths: 9,
      date: addMonths(new Date(birthDate), 9),
      diseases: ["Measles"],
      missed: false,
      missedDays: 0,
    },
    {
      id: 6,
      name: "MMR",
      ageMonths: 12,
      date: addMonths(new Date(birthDate), 12),
      diseases: ["Measles", "Mumps", "Rubella"],
      missed: false,
      missedDays: 0,
    },
    {
      id: 7,
      name: "DTP & OPV 4",
      ageMonths: 18,
      date: addMonths(new Date(birthDate), 18),
      diseases: ["Diphtheria", "Tetanus", "Pertussis", "Polio"],
      missed: false,
      missedDays: 0,
    },
    {
      id: 8,
      name: "DTP & OPV 5",
      ageMonths: 36,
      date: addMonths(new Date(birthDate), 36),
      diseases: ["Diphtheria", "Tetanus", "Pertussis", "Polio"],
      missed: false,
      missedDays: 0,
    },
  ];

  // Return all vaccines with calculated dates
  return vaccines;
};

// Function to update missed dates
export const updateMissedVaccine = (
  vaccines: Vaccine[],
  vaccineId: number,
  missedDays: number
): Vaccine[] => {
  // Find the vaccine that was missed
  const vaccineIndex = vaccines.findIndex((v) => v.id === vaccineId);
  
  if (vaccineIndex === -1 || !vaccines[vaccineIndex].date) {
    return vaccines;
  }

  // Create a copy of the vaccines array
  const updatedVaccines = [...vaccines];
  
  // Update the missed vaccine
  updatedVaccines[vaccineIndex] = {
    ...updatedVaccines[vaccineIndex],
    missed: true,
    missedDays,
    date: addDays(updatedVaccines[vaccineIndex].date!, missedDays),
  };

  // Update all future vaccines
  for (let i = vaccineIndex + 1; i < updatedVaccines.length; i++) {
    if (updatedVaccines[i].date) {
      updatedVaccines[i].date = addDays(updatedVaccines[i].date!, missedDays);
    }
  }

  return updatedVaccines;
};

// Function to format date
export const formatVaccineDate = (date: Date | null): string => {
  if (!date) return "N/A";
  return format(date, "MMMM d, yyyy");
};

// Function to check if vaccine date is in the past
export const isVaccinePast = (date: Date | null): boolean => {
  if (!date) return false;
  return isPast(date);
};

// Function to get highlighted dates for calendar
export const getHighlightedDates = (vaccines: Vaccine[]): Date[] => {
  return vaccines
    .filter((vaccine) => vaccine.date !== null)
    .map((vaccine) => vaccine.date as Date);
};

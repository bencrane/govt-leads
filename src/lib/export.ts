import type { LeadRecord } from "@/data/dummyData";
import { format } from "date-fns";

export function exportToCSV(data: LeadRecord[], filename = "govt_leads_export") {
  if (!data || data.length === 0) return;

  // Define headers mirroring the data shape but formatted for reading
  const headers = [
    "Company Name",
    "City",
    "State",
    "Physical Address",
    "Zip Code",
    "POC Name",
    "POC Title",
    "POC Phone",
    "Entity URL",
    "Award Amount",
    "Awarding Agency",
    "NAICS Code",
    "NAICS Description",
    "Action Date",
    "Is First Time Awardee",
    "Total Awards Count",
    "Business Size",
    "CAGE Code",
    "Registration Date",
    "USASpending Permalink"
  ];

  // Map data to CSV rows, ensuring complex fields are properly escaped
  const csvRows = data.map(record => [
    `"${record.company_name.replace(/"/g, '""')}"`,
    `"${record.city}"`,
    record.state,
    `"${record.physical_address}"`,
    record.zip_code,
    `"${record.poc_name}"`,
    `"${record.poc_title}"`,
    record.poc_phone,
    record.entity_url,
    record.award_amount,
    `"${record.awarding_agency}"`,
    record.naics_code,
    `"${record.naics_description.replace(/"/g, '""')}"`,
    record.action_date,
    record.is_first_time_awardee,
    record.total_awards_count,
    `"${record.business_size}"`,
    record.cage_code,
    record.registration_date,
    record.usaspending_permalink
  ].join(","));

  const csvContent = [headers.join(","), ...csvRows].join("\n");
  
  // Create blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const dateStr = format(new Date(), "yyyy-MM-dd");
  const exportFilename = `${filename}_${dateStr}.csv`;
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", exportFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

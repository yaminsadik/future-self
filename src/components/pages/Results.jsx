import { useLocation } from 'react-router-dom';
import { SAMPLE_SIZE_N } from '../../data/options';
import { SURVEY_RESULTS } from '../../data/surveyResults';

export default function Results() {
  const location = useLocation();
  const { category, selectionId, selectedLabel } = location.state || {};
  
  const data = SURVEY_RESULTS[selectionId];
  
  const moodData = data?.Mood;
  const energyData = data?.Energy;
  const focusData = data?.Focus;
  
  const createTableData = (metricData) => metricData ? [
    { condition: "Much Worse", percentage: `${metricData.muchWorse}%` },
    { condition: "Worse", percentage: `${metricData.worse}%` },
    { condition: "Normal", percentage: `${metricData.normal}%` },
    { condition: "Better", percentage: `${metricData.better}%` },
    { condition: "Much Better", percentage: `${metricData.muchBetter}%` },
  ] : [];
  
  const moodTableData = createTableData(moodData);
  const energyTableData = createTableData(energyData);
  const focusTableData = createTableData(focusData);
  
  const renderTable = (title, tableData) => (
    <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-left">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <table className="mt-4 w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 text-left font-semibold">Condition</th>
            <th className="py-3 text-left font-semibold">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="border-b border-border last:border-0">
              <td className="py-3 text-textSecondary">{row.condition}</td>
              <td className="py-3 text-textPrimary">{row.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-textSecondary">
        Confidence: Medium • n={SAMPLE_SIZE_N}
      </div>
    </div>
  );
  
  return (
    <div className="text-center">
      <div className="mt-6 text-2xl font-semibold">Results</div>
      <div className="mt-8 rounded-2xl border border-border bg-surface p-4 text-left">
        <h2 className="text-2xl font-semibold">Comparison</h2>
        <div className="mt-4 text-lg text-textSecondary">
          Category: <span className="text-textPrimary">{category}</span>
        </div>
        <div className="mt-4 text-lg text-textSecondary">
          Option: <span className="text-textPrimary">{selectedLabel}</span>
        </div>
        <div className="mt-4">
          Sample size (n): <span className="text-textPrimary">{SAMPLE_SIZE_N}</span>
        </div>
      </div>

      {renderTable("Mood", moodTableData)}
      {renderTable("Energy", energyTableData)}
      {renderTable("Focus", focusTableData)}
    </div>
  );
}
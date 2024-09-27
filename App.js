// import logo from './logo.svg';
// import './App.css';
import DateRangeSelector from './Daterangeselector';
// import Frequency from './Frequency';
 import { RecurrenceProvider } from './RecurrenceContext';
 import IntervalSelector from './IntervalSelector';
//  import DaysSelector from './DaysSelector';
import FrequencySelector from './FrequencySelector';
import CalendarPreview from './CalendarPreview';
import './stylefolder/datepicker.css';

function App() {
  return (<>
  
      <RecurrenceProvider>
      <h2>Recurring Date Picker</h2>
      <div className='recurringoptions'>
      <FrequencySelector/>
      <IntervalSelector/></div>
      {/* <DaysSelector/> */}
       <DateRangeSelector/> 
       <CalendarPreview/> 
      </RecurrenceProvider>
    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Style from "./styles/calls.module.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
// className={Style.Container}
export const Calls = ({data, loading}) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState('all');
    
    if (loading){
       return <p>Loading data...</p>
    }

    const convertDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        return `${hours}h ${minutes}m (${durationInSeconds} seconds) ` ;
      };

      
      
      const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
      
      const handleNoteChange = (e) => {
        // Handle note change
      };

      const handleSaveNote = () => {
        // Save the note logic here
        console.log('Note saved!');
    
        // Show alert when note is saved
        alert('Note saved successfully');
    
        // Close the dialog
        handleClose();
      };

    

    const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

    const filteredData = data.filter((item) => {
    if (filter === 'all') {
      return true; // Show all items
    } else if (filter === 'archived') {
      return item.is_archived;
    } else if (filter === 'not_archived') {
      return !item.is_archived;
    }
  });

  return (
  <div>
    {/* <label htmlFor="filter" className="filter-label">Filter:</label> */}
    <Box mt={4} mb={2} width={200} marginLeft={4}>
      <FormControl variant="outlined" size="small">
        <InputLabel id="filter-label">Filter:</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          label="Filter"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="archived">Archived</MenuItem>
          <MenuItem value="not_archived">Not Archived</MenuItem>
        </Select>
      </FormControl>
    </Box>


    
  <table>
    <thead>
    <tr>
      <th>Call Type</th>
      <th>Direction</th>
      <th>Duration</th>
      <th>From</th>
      <th>To</th>
      <th>VIA</th>
      <th>Created At</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {filteredData.map((item) => {
        const createdAt = item.created_at.slice(0,10); // Split and get the first part
        const duration = convertDuration(item.duration); // Convert duration to hours and minutes

        return (
          <tr key={item.id} >
            <td style={{ color: item.call_type === 'missed' ? 'red' : item.call_type === 'voicemail' ? 'blue' : 'green' }}>
             {item.call_type}
            </td>
            <td>{item.direction}</td>
            <td>{duration}</td> {/* Display converted duration */}
            <td>{item.from}</td>
            <td>{item.to}</td>
            <td>{item.via}</td>
            <td >{createdAt}</td> {/* Use the modified createdAt value */}
            <td style={{ color: item.is_archived ? 'green' : 'red' }} >
                {item.is_archived ? 'Archived' : 'Not Archived'}
            </td>
            <td>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px', color:'#4f46f8' }}>
            <Button size="small" variant="contained" color="primary" onClick={() => handleOpen(item)}>
              Add note
            </Button>
          </div>
          </td>
            {/* <td>{item.is_archived ? 'Archived' : 'Not Archived'}</td>
            <td>{item.from}</td>
            <td>{item.to}</td> */}
          </tr>
        );
      })}
    </tbody>
  </table>
  <Dialog open={open} onClose={handleClose} PaperProps={{
    style: {
      width: '50%', // Set the desired width
      maxWidth: 'none', // Override the maximum width restriction
    },
  }}>
      <DialogTitle>Add Notes</DialogTitle>
      <DialogContent><p style={{color: "blue"}}>Call ID: {selectedItem?.id}</p></DialogContent>
      
      <hr className={Style.divider} />
      <DialogContent>
        <div className={Style.calldetails}>
        <p><b>Call Type:</b> {selectedItem?.call_type}</p>
        <p><b>Call Duration:</b> {convertDuration(selectedItem?.duration)}</p>
        <p><b>From:</b> {selectedItem?.from}</p>
        <p><b>To:</b> {selectedItem?.to}</p>
        <p><b>Via:</b> {selectedItem?.via}</p>
        </div>

        <div className={Style.notesection}>
        <hr className={Style.divider} />
        <TextField
        label="Add a note"
        multiline
        rows={4}
        variant="outlined"
        onChange={handleNoteChange}
        style={{ width: '100%' }}
        
      />
      </div>


      </DialogContent>
      <DialogActions>
      <Button onClick={handleSaveNote} color="primary">Save Note</Button>
      <Button onClick={handleClose} color="primary">Close</Button>
          
      </DialogActions>
    </Dialog>
  </div>
);
    };

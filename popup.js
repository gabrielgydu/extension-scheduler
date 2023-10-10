// Fetch and display the saved schedule when the popup is opened
chrome.storage.local.get('schedule', function(data) {
    if (data.schedule) {
        document.getElementById('schedule').value = data.schedule;
    }
});

// Save the schedule when the save button is clicked
document.getElementById('save').addEventListener('click', function() {
    const schedule = document.getElementById('schedule').value;
    chrome.storage.local.set({schedule: schedule}, function() {
        alert('Schedule saved successfully!');
    });
});

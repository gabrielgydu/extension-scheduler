const TARGET_EXTENSION_ID = 'femnahohginddofgekknfmaklcbpinkn';

function checkSchedule() {
    chrome.storage.local.get(['schedule'], function(data) {
        if (!data.schedule) {
            console.log("No schedule found.");
            return;
        }

        const today = new Date();
        const lines = data.schedule.split('\n');
        console.log("Checking schedule for:", today.toLocaleString('en-us', {weekday: 'short'}));

        for (const line of lines) {
            if (!line.trim()) continue;  // Skip empty lines
            console.log(line)
            const [day, timeRange] = line.split(',');
            console.log(day,timeRange)
            const [start, end] = timeRange.split('-');
            console.log(start,end)

            const startHour = parseInt(start.split(':')[0]);
            const startMinute = parseInt(start.split(':')[1]);
            const endHour = parseInt(end.split(':')[0]);
            const endMinute = parseInt(end.split(':')[1]);

            if (day.toLowerCase() === today.toLocaleString('en-us', {weekday: 'short'}).toLowerCase() &&
                (today.getHours() > startHour || (today.getHours() === startHour && today.getMinutes() >= startMinute)) &&
                (today.getHours() < endHour || (today.getHours() === endHour && today.getMinutes() <= endMinute))) {
                console.log("Within scheduled time, enabling the extension...");
                chrome.management.setEnabled(TARGET_EXTENSION_ID, true);
                return;
            }
        }

        console.log("Outside of scheduled time, disabling the extension...");
        chrome.management.setEnabled(TARGET_EXTENSION_ID, false);
    });
}

// Trigger the check immediately when the script is loaded
checkSchedule();
// Then check every minute
setInterval(checkSchedule, 60000);

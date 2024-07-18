document.addEventListener('DOMContentLoaded', function() {
    const appointmentDateTimeInput = document.getElementById('appointmentDateTime');

    // Set min and max date-time values for input
    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 7); // Max date is one week from today
    const maxDateFormatted = maxDate.toISOString().split("T")[0];
    appointmentDateTimeInput.min = `${today}T09:00`;
    appointmentDateTimeInput.max = `${maxDateFormatted}T17:00`;

    // Function to send appointment details via email
    async function sendAppointmentEmail(appointmentDateTime, name, company) {
        const formData = new FormData();
        formData.append('email', 'usefaissa@gmail.com');
        formData.append('subject', 'Appointment Scheduled');
        formData.append('message', `An appointment has been scheduled for ${appointmentDateTime}.\nName: ${name}\nCompany: ${company}`);

        try {
            const response = await fetch('letstalk.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                console.log('Email sent successfully.');
            } else {
                console.error('Failed to send email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    // Event listener for scheduling button click
    const scheduleButton = document.getElementById('scheduleButton');
    scheduleButton.addEventListener('click', function() {
        const appointmentDateTime = appointmentDateTimeInput.value;
        const name = document.getElementById('name').value;
        const company = document.getElementById('company').value;

        // Validate if selected datetime is within allowed range
        const selectedDate = new Date(appointmentDateTime);
        if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6 || selectedDate.getHours() < 9 || selectedDate.getHours() >= 17) {
            alert('Please select a date and time between Monday to Friday, 9:00 AM to 5:00 PM.');
            return;
        }

        // Perform action to schedule appointment (e.g., send email, integrate Google Meet)
        sendAppointmentEmail(appointmentDateTime, name, company);
        alert(`Appointment scheduled for: ${appointmentDateTime}`);

        // Clear form or perform further actions as needed
        appointmentDateTimeInput.value = '';
        document.getElementById('name').value = '';
        document.getElementById('company').value = '';
    });
});

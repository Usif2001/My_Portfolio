<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $headers = 'From: your_email@example.com' . "\r\n" .
        'Reply-To: your_email@example.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo json_encode(array("message" => "Email sent successfully."));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to send email."));
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Method not allowed."));
}
?>

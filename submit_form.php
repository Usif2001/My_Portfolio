<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $company = htmlspecialchars($_POST['company']);
    $message = htmlspecialchars($_POST['message']);
    $service = htmlspecialchars($_POST['service']);

    
    $uploadSuccess = false;
    if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = $_FILES['file']['name'];
        $fileSize = $_FILES['file']['size'];
        $fileType = $_FILES['file']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));
        $allowedfileExtensions = array('jpg', 'gif', 'png', 'txt', 'pdf'); // Add any extensions you want to allow

        if (in_array($fileExtension, $allowedfileExtensions)) {
            $uploadFileDir = './uploads/';
            $dest_path = $uploadFileDir . $fileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                $uploadSuccess = true;
            }
        }
    }

    
    $to = 'usefaissa@gmail.com';
    $subject = 'New Contact Form Submission';
    $body = "Name: $name\nEmail: $email\nCompany: $company\nMessage: $message\nService Interested In: $service\n";
    if ($uploadSuccess) {
        $body .= "File uploaded: $fileName\n";
    }
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for contacting us. We will get back to you shortly.";
    } else {
        echo "There was an error sending your message. Please try again later.";
    }
}
?>

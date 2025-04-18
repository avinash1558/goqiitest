<?php
// Allow CORS
header("Access-Control-Allow-Origin: *"); // You can specify a domain here instead of "*"
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request (this is important for non-GET requests)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../config/db.php"); // Database connection (make sure path is correct)
header("Content-Type: application/json"); // Ensure response is JSON

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all users
        $sql = "SELECT * FROM users";
        $result = $conn->query($sql);

        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users);
        break;

    case 'POST':
        // Create user
        $data = json_decode(file_get_contents("php://input"));

        if (!$data || !isset($data->name, $data->email, $data->password, $data->dob)) {
            echo json_encode(["error" => "Invalid input"]);
            exit();
        }

        $name = $conn->real_escape_string($data->name);
        $email = $conn->real_escape_string($data->email);
        $password = password_hash($data->password, PASSWORD_DEFAULT);
        $dob = $conn->real_escape_string($data->dob);

        $sql = "INSERT INTO users (name, email, password, dob) VALUES ('$name', '$email', '$password', '$dob')";
        if ($conn->query($sql)) {
            http_response_code(201);
            echo json_encode(["message" => "User created"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $conn->error]);
        }
        break;

    case 'PUT':
        // Update user
        $data = json_decode(file_get_contents("php://input"));

        if (!$data || !isset($data->id, $data->name, $data->email, $data->dob)) {
            echo json_encode(["error" => "Invalid input"]);
            exit();
        }

        $id = (int)$data->id;
        $name = $conn->real_escape_string($data->name);
        $email = $conn->real_escape_string($data->email);
        $dob = $conn->real_escape_string($data->dob);

        $sql = "UPDATE users SET name='$name', email='$email', dob='$dob' WHERE id=$id";
        if ($conn->query($sql)) {
            http_response_code(200);
            echo json_encode(["message" => "User updated"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $conn->error]);
        }
        break;

    case 'DELETE':
        // Delete user
        $data = json_decode(file_get_contents("php://input"));

        if (!$data || !isset($data->id)) {
            echo json_encode(["error" => "Invalid input"]);
            exit();
        }

        $id = (int)$data->id;

        $sql = "DELETE FROM users WHERE id=$id";
        if ($conn->query($sql)) {
            http_response_code(200);
            echo json_encode(["message" => "User deleted"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => $conn->error]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Invalid request method"]);
        break;
}

$conn->close();
?>

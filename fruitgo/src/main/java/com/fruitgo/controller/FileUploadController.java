package com.fruitgo.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class FileUploadController {

    private final String UPLOAD_DIR =
            "uploads/";

@PostMapping
public String uploadFile(
        @RequestParam("file") MultipartFile file
) throws IOException {

    String uploadDir =
            System.getProperty("user.dir")
            + File.separator
            + "uploads";

    File directory =
            new File(uploadDir);

    if (!directory.exists()) {
        directory.mkdirs();
    }

    String fileName =
            file.getOriginalFilename();

    File destination =
            new File(
                    directory,
                    fileName
            );

    file.transferTo(destination);

    return "http://localhost:8080/uploads/"
            + fileName;
}
}

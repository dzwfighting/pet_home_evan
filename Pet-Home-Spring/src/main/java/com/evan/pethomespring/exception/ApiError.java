package com.evan.pethomespring.exception;

import java.time.LocalDateTime;
import java.util.Objects;

public class ApiError {
    private final String path;
    private final String message;
    private final int statusCode;
    private final LocalDateTime localDateTime;

    public ApiError(String path, String message, int statusCode, LocalDateTime localDateTime) {
        this.path = path;
        this.message = message;
        this.statusCode = statusCode;
        this.localDateTime = localDateTime;
    }

    public String getPath() {
        return path;
    }

    public String getMessage() {
        return message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ApiError)) return false;
        ApiError apiError = (ApiError) o;
        return statusCode == apiError.statusCode && Objects.equals(path, apiError.path) && Objects.equals(message, apiError.message) && Objects.equals(localDateTime, apiError.localDateTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(path, message, statusCode, localDateTime);
    }

    @Override
    public String toString() {
        return "ApiError{" +
                "path='" + path + '\'' +
                ", message='" + message + '\'' +
                ", statusCode=" + statusCode +
                ", localDateTime=" + localDateTime +
                '}';
    }
}

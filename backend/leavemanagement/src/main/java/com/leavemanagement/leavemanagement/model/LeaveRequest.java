package com.leavemanagement.leavemanagement.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "leave_requests")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fromDate;
    private LocalDate toDate;
    private String reason;
    private String status; // PENDING, APPROVED, REJECTED

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private User employee;  // Linked to User (Employee)

    public LeaveRequest() {}

    public LeaveRequest(LocalDate fromDate, LocalDate toDate, String reason, String status, User employee) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.reason = reason;
        this.status = status;
        this.employee = employee;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getFromDate() { return fromDate; }
    public void setFromDate(LocalDate fromDate) { this.fromDate = fromDate; }

    public LocalDate getToDate() { return toDate; }
    public void setToDate(LocalDate toDate) { this.toDate = toDate; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public User getEmployee() { return employee; }
    public void setEmployee(User employee) { this.employee = employee; }
}
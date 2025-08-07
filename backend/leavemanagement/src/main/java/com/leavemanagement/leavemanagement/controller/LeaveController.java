package com.leavemanagement.leavemanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leavemanagement.leavemanagement.model.LeaveRequest;
import com.leavemanagement.leavemanagement.services.LeaveRequestService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/leaves")
// Removed duplicate @CrossOrigin annotation to avoid errors
public class LeaveController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    // Apply for leave (create a leave request)
    @PostMapping("/{employeeId}")
    public LeaveRequest createLeaveRequest(@PathVariable Long employeeId, @RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.createLeaveRequest(employeeId, leaveRequest);
    }

    // Get all leave requests
    @GetMapping
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestService.getAllLeaveRequests();
    }

    // Get leave requests by status (e.g., PENDING, APPROVED, REJECTED)
    @GetMapping("/status/{status}")
    public List<LeaveRequest> getLeaveRequestsByStatus(@PathVariable String status) {
        return leaveRequestService.getLeaveRequestsByStatus(status);
    }

    // Get leave requests by employee ID
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getLeaveRequestsByEmployee(@PathVariable Long employeeId) {
        return leaveRequestService.getLeaveRequestsByEmployee(employeeId);
    }

    // Approve or Reject leave request (update status)
    @PutMapping("/{leaveRequestId}")
    public LeaveRequest updateLeaveStatus(@PathVariable Long leaveRequestId, @RequestParam String status, @RequestParam Long userId) {
        return leaveRequestService.updateLeaveRequestStatus(leaveRequestId, status, userId);
    }

    // Delete a leave request
    @DeleteMapping("/{leaveRequestId}")
    public void deleteLeaveRequest(@PathVariable Long leaveRequestId, @RequestParam Long userId) {
        leaveRequestService.deleteLeaveRequest(leaveRequestId, userId);
    }

    
    @GetMapping("/calendar")
public List<Map<String, Object>> getCalendarLeaves() {
    List<LeaveRequest> approvedLeaves = leaveRequestService.getLeaveRequestsByStatus("APPROVED");

    return approvedLeaves.stream().map(leave -> {
        Map<String, Object> event = new HashMap<>();
        event.put("title", leave.getEmployee().getName() + " on Leave");
        event.put("start", leave.getFromDate().toString());
        event.put("end", leave.getToDate().plusDays(1).toString()); // FullCalendar uses exclusive end
        return event;
    }).toList();
}
 @GetMapping("/{leaveRequestId}")
    public Optional<LeaveRequest> getLeaveRequestById(@PathVariable Long leaveRequestId) {
        return leaveRequestService.getLeaveRequestById(leaveRequestId);
    }

}
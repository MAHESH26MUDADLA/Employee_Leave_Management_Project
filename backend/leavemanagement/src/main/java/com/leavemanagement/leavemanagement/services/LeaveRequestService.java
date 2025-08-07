package com.leavemanagement.leavemanagement.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leavemanagement.leavemanagement.model.LeaveRequest;
import com.leavemanagement.leavemanagement.model.Role;
import com.leavemanagement.leavemanagement.model.User;
import com.leavemanagement.leavemanagement.repository.LeaveRequestRepository;
import com.leavemanagement.leavemanagement.repository.UserRepository;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailServices emailService; 

    // Create a leave request 
    public LeaveRequest createLeaveRequest(Long userId, LeaveRequest leaveRequest) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent() && optionalUser.get().getRole() == Role.EMPLOYEE) {
            leaveRequest.setEmployee(optionalUser.get());
            leaveRequest.setStatus("PENDING");
            LeaveRequest savedLeave = leaveRequestRepository.save(leaveRequest);

            // Send email to employee
            String toEmail = optionalUser.get().getEmail();
            String subject = "Leave Request Submitted";
            String body = "Hi " + optionalUser.get().getName() + ", your leave request has been submitted.";
            emailService.sendEmail(toEmail, subject, body);

             String toEmail1 ="mudadam61@gmail.com";
             String subject1 = "Employee Request For Leave";
             String body1 = "Hi " + optionalUser.get().getName() + ", New Leave Request.";
             emailService.sendEmail(toEmail1, subject1, body1);

            return savedLeave;
        } else {
            throw new RuntimeException("Only employees can create leave requests or user not found with id: " + userId);
        }
    }

    // Get all leave requests 
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    
    public LeaveRequest updateLeaveRequestStatus(Long leaveRequestId, String status, Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent() && optionalUser.get().getRole() == Role.MANAGER) {
            Optional<LeaveRequest> optionalLeaveRequest = leaveRequestRepository.findById(leaveRequestId);
            if (optionalLeaveRequest.isPresent()) {
                LeaveRequest leaveRequest = optionalLeaveRequest.get();
                leaveRequest.setStatus(status);
                LeaveRequest updatedLeave = leaveRequestRepository.save(leaveRequest);

                
                String toEmail = leaveRequest.getEmployee().getEmail();
                String subject = "Leave Request " + status;
                String body = "Hi " + leaveRequest.getEmployee().getName() +
                              ", your leave request has been " + status.toLowerCase() + ".";
                emailService.sendEmail(toEmail, subject, body);

                return updatedLeave;
            } else {
                throw new RuntimeException("Leave request not found with id: " + leaveRequestId);
            }
        } else {
            throw new RuntimeException("Only managers can approve/reject leave requests or user not found with id: " + userId);
        }
    }

    // Delete a leave request
    public void deleteLeaveRequest(Long leaveRequestId, Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            Optional<LeaveRequest> optionalLeaveRequest = leaveRequestRepository.findById(leaveRequestId);
            if (optionalLeaveRequest.isPresent()) {
                LeaveRequest leaveRequest = optionalLeaveRequest.get();
                if (leaveRequest.getEmployee().getId().equals(userId) || optionalUser.get().getRole() == Role.MANAGER) {
                    leaveRequestRepository.deleteById(leaveRequestId);
                } else {
                    throw new RuntimeException("You don't have permission to delete this leave request.");
                }
            } else {
                throw new RuntimeException("Leave request not found with id: " + leaveRequestId);
            }
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }

    // Get leave requests by employee
    public List<LeaveRequest> getLeaveRequestsByEmployee(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent() && optionalUser.get().getRole() == Role.EMPLOYEE) {
            return leaveRequestRepository.findByEmployeeId(userId);
        } else {
            throw new RuntimeException("Only employees can view their leave requests or user not found with id: " + userId);
        }
    }

    // Get leave requests by status
    public List<LeaveRequest> getLeaveRequestsByStatus(String status) {
        return leaveRequestRepository.findByStatus(status);
    }

    // Get a specific leave request by ID
    public Optional<LeaveRequest> getLeaveRequestById(Long leaveRequestId) {
        return leaveRequestRepository.findById(leaveRequestId);
    }


    
}

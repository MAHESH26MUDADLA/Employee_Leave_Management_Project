package com.leavemanagement.leavemanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leavemanagement.leavemanagement.model.LeaveRequest;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByStatus(String status);

    
    List<LeaveRequest> findByEmployeeId(Long employeeId);

    
   

    
}

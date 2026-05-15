package com.uibfs.helpdesk.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Data                   // this will help me generate getters, setters, toString, equals, hashCode
@NoArgsConstructor      // this will help me generate default constructor
@AllArgsConstructor     // this will help me generate constructor with all fields
@Builder                
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Issue title is required")
    private String issueTitle;

    @NotBlank(message = "Issue description is required")
    @Column(columnDefinition = "TEXT")
    private String issueDescription;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Priority priority = Priority.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.OPEN;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
// these are my enums for priority and status of the ticket. put right here to avoid creating separate files for them. they are simple and only used in this class, so it makes sense 
    public enum Priority { LOW, MEDIUM, HIGH } 
    public enum Status { OPEN, IN_PROGRESS, RESOLVED }
}

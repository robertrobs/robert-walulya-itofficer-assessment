package com.uibfs.helpdesk.controller;

import com.uibfs.helpdesk.model.Ticket;
import com.uibfs.helpdesk.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // POST /api/tickets
    @PostMapping
    public ResponseEntity<?> createTicket(@Valid @RequestBody Ticket ticket) {
        Ticket saved = ticketService.createTicket(ticket);
        return ResponseEntity.ok(saved);
    }

    // GET /api/tickets
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    // GET /api/tickets/email/{email} (will fetch tickets by email address)
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Ticket>> getTicketsByEmail(@PathVariable String email) {
        return ResponseEntity.ok(ticketService.getTicketsByEmail(email));
    }

    // PUT /api/tickets/{id}/status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Ticket.Status status = Ticket.Status.valueOf(body.get("status"));
        Ticket updated = ticketService.updateTicketStatus(id, status);
        return ResponseEntity.ok(updated);
    }
}


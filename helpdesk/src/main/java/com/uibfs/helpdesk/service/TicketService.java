package com.uibfs.helpdesk.service;

import com.uibfs.helpdesk.model.Ticket;
import com.uibfs.helpdesk.repository.TicketRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    //this is the function that will create a new ticket and save it to the database. it
    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    // all the created tickets will be retrieved and returned as a list. 
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getTicketsByEmail(String email) {
        return ticketRepository.findByEmail(email);
    }

    public Ticket updateTicketStatus(Long id, Ticket.Status status) {
        Ticket ticket = ticketRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }
}


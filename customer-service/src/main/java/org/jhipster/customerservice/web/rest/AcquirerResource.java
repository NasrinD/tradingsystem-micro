package org.jhipster.customerservice.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.customerservice.domain.Acquirer;

import org.jhipster.customerservice.repository.AcquirerRepository;
import org.jhipster.customerservice.web.rest.errors.BadRequestAlertException;
import org.jhipster.customerservice.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Acquirer.
 */
@RestController
@RequestMapping("/api")
public class AcquirerResource {

    private final Logger log = LoggerFactory.getLogger(AcquirerResource.class);

    private static final String ENTITY_NAME = "acquirer";

    private final AcquirerRepository acquirerRepository;

    public AcquirerResource(AcquirerRepository acquirerRepository) {
        this.acquirerRepository = acquirerRepository;
    }

    /**
     * POST  /acquirers : Create a new acquirer.
     *
     * @param acquirer the acquirer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new acquirer, or with status 400 (Bad Request) if the acquirer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/acquirers")
    @Timed
    public ResponseEntity<Acquirer> createAcquirer(@Valid @RequestBody Acquirer acquirer) throws URISyntaxException {
        log.debug("REST request to save Acquirer : {}", acquirer);
        if (acquirer.getId() != null) {
            throw new BadRequestAlertException("A new acquirer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Acquirer result = acquirerRepository.save(acquirer);
        return ResponseEntity.created(new URI("/api/acquirers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /acquirers : Updates an existing acquirer.
     *
     * @param acquirer the acquirer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated acquirer,
     * or with status 400 (Bad Request) if the acquirer is not valid,
     * or with status 500 (Internal Server Error) if the acquirer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/acquirers")
    @Timed
    public ResponseEntity<Acquirer> updateAcquirer(@Valid @RequestBody Acquirer acquirer) throws URISyntaxException {
        log.debug("REST request to update Acquirer : {}", acquirer);
        if (acquirer.getId() == null) {
            return createAcquirer(acquirer);
        }
        Acquirer result = acquirerRepository.save(acquirer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, acquirer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /acquirers : get all the acquirers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of acquirers in body
     */
    @GetMapping("/acquirers")
    @Timed
    public List<Acquirer> getAllAcquirers() {
        log.debug("REST request to get all Acquirers");
        return acquirerRepository.findAll();
        }

    /**
     * GET  /acquirers/:id : get the "id" acquirer.
     *
     * @param id the id of the acquirer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the acquirer, or with status 404 (Not Found)
     */
    @GetMapping("/acquirers/{id}")
    @Timed
    public ResponseEntity<Acquirer> getAcquirer(@PathVariable Long id) {
        log.debug("REST request to get Acquirer : {}", id);
        Acquirer acquirer = acquirerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(acquirer));
    }

    /**
     * DELETE  /acquirers/:id : delete the "id" acquirer.
     *
     * @param id the id of the acquirer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/acquirers/{id}")
    @Timed
    public ResponseEntity<Void> deleteAcquirer(@PathVariable Long id) {
        log.debug("REST request to delete Acquirer : {}", id);
        acquirerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package org.jhipster.bankservice.repository;

import org.jhipster.bankservice.domain.CardReaderController;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CardReaderController entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardReaderControllerRepository extends JpaRepository<CardReaderController, Long> {

}

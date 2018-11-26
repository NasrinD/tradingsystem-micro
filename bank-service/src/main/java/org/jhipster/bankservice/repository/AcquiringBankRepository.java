package org.jhipster.bankservice.repository;

import org.jhipster.bankservice.domain.AcquiringBank;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AcquiringBank entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcquiringBankRepository extends JpaRepository<AcquiringBank, Long> {

}

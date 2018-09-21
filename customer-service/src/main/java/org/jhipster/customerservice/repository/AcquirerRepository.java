package org.jhipster.customerservice.repository;

import org.jhipster.customerservice.domain.Acquirer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Acquirer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcquirerRepository extends JpaRepository<Acquirer, Long> {

}

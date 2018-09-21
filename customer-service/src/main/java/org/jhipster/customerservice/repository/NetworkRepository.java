package org.jhipster.customerservice.repository;

import org.jhipster.customerservice.domain.Network;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Network entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NetworkRepository extends JpaRepository<Network, Long> {

}

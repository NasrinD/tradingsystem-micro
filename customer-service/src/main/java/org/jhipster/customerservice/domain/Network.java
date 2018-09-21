package org.jhipster.customerservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Network.
 */
@Entity
@Table(name = "network")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Network implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "network")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Acquirer> acquirers = new HashSet<>();

    @OneToMany(mappedBy = "network")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Bank> banks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Network name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Acquirer> getAcquirers() {
        return acquirers;
    }

    public Network acquirers(Set<Acquirer> acquirers) {
        this.acquirers = acquirers;
        return this;
    }

    public Network addAcquirers(Acquirer acquirer) {
        this.acquirers.add(acquirer);
        acquirer.setNetwork(this);
        return this;
    }

    public Network removeAcquirers(Acquirer acquirer) {
        this.acquirers.remove(acquirer);
        acquirer.setNetwork(null);
        return this;
    }

    public void setAcquirers(Set<Acquirer> acquirers) {
        this.acquirers = acquirers;
    }

    public Set<Bank> getBanks() {
        return banks;
    }

    public Network banks(Set<Bank> banks) {
        this.banks = banks;
        return this;
    }

    public Network addBanks(Bank bank) {
        this.banks.add(bank);
        bank.setNetwork(this);
        return this;
    }

    public Network removeBanks(Bank bank) {
        this.banks.remove(bank);
        bank.setNetwork(null);
        return this;
    }

    public void setBanks(Set<Bank> banks) {
        this.banks = banks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Network network = (Network) o;
        if (network.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), network.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Network{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

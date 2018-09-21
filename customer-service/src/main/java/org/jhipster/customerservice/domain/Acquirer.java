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
 * A Acquirer.
 */
@Entity
@Table(name = "acquirer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Acquirer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address")
    private String address;

    @OneToMany(mappedBy = "acquirer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CardReader> cardReaders = new HashSet<>();

    @ManyToOne
    private Network network;

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

    public Acquirer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Acquirer address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<CardReader> getCardReaders() {
        return cardReaders;
    }

    public Acquirer cardReaders(Set<CardReader> cardReaders) {
        this.cardReaders = cardReaders;
        return this;
    }

    public Acquirer addCardReaders(CardReader cardReader) {
        this.cardReaders.add(cardReader);
        cardReader.setAcquirer(this);
        return this;
    }

    public Acquirer removeCardReaders(CardReader cardReader) {
        this.cardReaders.remove(cardReader);
        cardReader.setAcquirer(null);
        return this;
    }

    public void setCardReaders(Set<CardReader> cardReaders) {
        this.cardReaders = cardReaders;
    }

    public Network getNetwork() {
        return network;
    }

    public Acquirer network(Network network) {
        this.network = network;
        return this;
    }

    public void setNetwork(Network network) {
        this.network = network;
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
        Acquirer acquirer = (Acquirer) o;
        if (acquirer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), acquirer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Acquirer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}

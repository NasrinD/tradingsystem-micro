package org.jhipster.customerservice.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CardReader.
 */
@Entity
@Table(name = "card_reader")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CardReader implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "cash_deskid")
    private Long cashDeskid;

    @OneToOne
    @JoinColumn(unique = true)
    private CardReaderController controller;

    @ManyToOne
    private Acquirer acquirer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public CardReader model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Long getCashDeskid() {
        return cashDeskid;
    }

    public CardReader cashDeskid(Long cashDeskid) {
        this.cashDeskid = cashDeskid;
        return this;
    }

    public void setCashDeskid(Long cashDeskid) {
        this.cashDeskid = cashDeskid;
    }

    public CardReaderController getController() {
        return controller;
    }

    public CardReader controller(CardReaderController cardReaderController) {
        this.controller = cardReaderController;
        return this;
    }

    public void setController(CardReaderController cardReaderController) {
        this.controller = cardReaderController;
    }

    public Acquirer getAcquirer() {
        return acquirer;
    }

    public CardReader acquirer(Acquirer acquirer) {
        this.acquirer = acquirer;
        return this;
    }

    public void setAcquirer(Acquirer acquirer) {
        this.acquirer = acquirer;
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
        CardReader cardReader = (CardReader) o;
        if (cardReader.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cardReader.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CardReader{" +
            "id=" + getId() +
            ", model='" + getModel() + "'" +
            ", cashDeskid=" + getCashDeskid() +
            "}";
    }
}

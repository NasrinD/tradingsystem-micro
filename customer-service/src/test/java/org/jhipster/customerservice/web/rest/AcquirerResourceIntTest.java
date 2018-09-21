package org.jhipster.customerservice.web.rest;

import org.jhipster.customerservice.CustomerApp;

import org.jhipster.customerservice.domain.Acquirer;
import org.jhipster.customerservice.repository.AcquirerRepository;
import org.jhipster.customerservice.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.customerservice.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AcquirerResource REST controller.
 *
 * @see AcquirerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CustomerApp.class)
public class AcquirerResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private AcquirerRepository acquirerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAcquirerMockMvc;

    private Acquirer acquirer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcquirerResource acquirerResource = new AcquirerResource(acquirerRepository);
        this.restAcquirerMockMvc = MockMvcBuilders.standaloneSetup(acquirerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Acquirer createEntity(EntityManager em) {
        Acquirer acquirer = new Acquirer()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS);
        return acquirer;
    }

    @Before
    public void initTest() {
        acquirer = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcquirer() throws Exception {
        int databaseSizeBeforeCreate = acquirerRepository.findAll().size();

        // Create the Acquirer
        restAcquirerMockMvc.perform(post("/api/acquirers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acquirer)))
            .andExpect(status().isCreated());

        // Validate the Acquirer in the database
        List<Acquirer> acquirerList = acquirerRepository.findAll();
        assertThat(acquirerList).hasSize(databaseSizeBeforeCreate + 1);
        Acquirer testAcquirer = acquirerList.get(acquirerList.size() - 1);
        assertThat(testAcquirer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAcquirer.getAddress()).isEqualTo(DEFAULT_ADDRESS);
    }

    @Test
    @Transactional
    public void createAcquirerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acquirerRepository.findAll().size();

        // Create the Acquirer with an existing ID
        acquirer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcquirerMockMvc.perform(post("/api/acquirers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acquirer)))
            .andExpect(status().isBadRequest());

        // Validate the Acquirer in the database
        List<Acquirer> acquirerList = acquirerRepository.findAll();
        assertThat(acquirerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = acquirerRepository.findAll().size();
        // set the field null
        acquirer.setName(null);

        // Create the Acquirer, which fails.

        restAcquirerMockMvc.perform(post("/api/acquirers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acquirer)))
            .andExpect(status().isBadRequest());

        List<Acquirer> acquirerList = acquirerRepository.findAll();
        assertThat(acquirerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAcquirers() throws Exception {
        // Initialize the database
        acquirerRepository.saveAndFlush(acquirer);

        // Get all the acquirerList
        restAcquirerMockMvc.perform(get("/api/acquirers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acquirer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())));
    }

    @Test
    @Transactional
    public void getAcquirer() throws Exception {
        // Initialize the database
        acquirerRepository.saveAndFlush(acquirer);

        // Get the acquirer
        restAcquirerMockMvc.perform(get("/api/acquirers/{id}", acquirer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(acquirer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAcquirer() throws Exception {
        // Get the acquirer
        restAcquirerMockMvc.perform(get("/api/acquirers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcquirer() throws Exception {
        // Initialize the database
        acquirerRepository.saveAndFlush(acquirer);
        int databaseSizeBeforeUpdate = acquirerRepository.findAll().size();

        // Update the acquirer
        Acquirer updatedAcquirer = acquirerRepository.findOne(acquirer.getId());
        // Disconnect from session so that the updates on updatedAcquirer are not directly saved in db
        em.detach(updatedAcquirer);
        updatedAcquirer
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS);

        restAcquirerMockMvc.perform(put("/api/acquirers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcquirer)))
            .andExpect(status().isOk());

        // Validate the Acquirer in the database
        List<Acquirer> acquirerList = acquirerRepository.findAll();
        assertThat(acquirerList).hasSize(databaseSizeBeforeUpdate);
        Acquirer testAcquirer = acquirerList.get(acquirerList.size() - 1);
        assertThat(testAcquirer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAcquirer.getAddress()).isEqualTo(UPDATED_ADDRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingAcquirer() throws Exception {
        int databaseSizeBeforeUpdate = acquirerRepository.findAll().size();

        // Create the Acquirer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAcquirerMockMvc.perform(put("/api/acquirers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(acquirer)))
            .andExpect(status().isCreated());

        // Validate the Acquirer in the database
        List<Acquirer> acquirerList = acquirerRepository.findAll();
        assertThat(acquirerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAcquirer() throws Exception {
        // Initialize the database
        acquirerRepository.saveAndFlush(acquirer);
        int databaseSizeBeforeDelete = acquirerRepository.findAll().size();

        // Get the acquirer
        restAcquirerMockMvc.perform(delete("/api/acquirers/{id}", acquirer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Acquirer> acquirerList = acquirerRepository.findAll();
        assertThat(acquirerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Acquirer.class);
        Acquirer acquirer1 = new Acquirer();
        acquirer1.setId(1L);
        Acquirer acquirer2 = new Acquirer();
        acquirer2.setId(acquirer1.getId());
        assertThat(acquirer1).isEqualTo(acquirer2);
        acquirer2.setId(2L);
        assertThat(acquirer1).isNotEqualTo(acquirer2);
        acquirer1.setId(null);
        assertThat(acquirer1).isNotEqualTo(acquirer2);
    }
}

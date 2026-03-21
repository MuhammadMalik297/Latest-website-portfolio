import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';

const SystemLabScene = lazy(() => import('../components/SystemLabScene').then((module) => ({ default: module.SystemLabScene })));

const capabilityInsights = {
  qa: [
    {
      short: 'Playwright',
      title: 'A framework that stays clean as coverage grows',
      summary:
        'Reusable Playwright structure, helper layers, and Page Object thinking so new coverage does not turn into a maintenance mess the moment the product grows.',
      readout:
        'This node reflects the kind of framework work I handled around CitrusBits: stable structure first, then coverage on top of it, so the system can actually survive real product change.',
      reference: 'CitrusBits · Playwright + TypeScript · Page Object Model',
      tags: ['Playwright', 'TypeScript', 'Framework design'],
    },
    {
      short: 'Cross-platform',
      title: 'Coverage that matches how people actually use the product',
      summary:
        'Not just happy-path scripts. This means smoke, regression, exploratory thinking, and cross-platform testing across web, iOS, and Android.',
      readout:
        'I do not like coverage that only looks good in a demo. This is about testing the product the way it is actually experienced across platforms and release conditions.',
      reference: 'Web · iOS · Android · Smoke + Regression + Exploratory',
      tags: ['Web', 'iOS', 'Android'],
    },
    {
      short: 'Release',
      title: 'Release confidence, not just test execution',
      summary:
        'CI runs, Jira cases, validation checks, bug triage, and the last-mile discipline that helps a team ship without unnecessary chaos.',
      readout:
        'The useful part of QA is not only running tests. It is helping the team reach a calmer release state, with the right checks, the right notes, and fewer last-minute surprises.',
      reference: 'GitHub Actions · Jira · Validation checks · Release QA',
      tags: ['GitHub Actions', 'Jira', 'Release confidence'],
    },
  ],
  ai: [
    {
      short: 'SignFusion',
      title: 'Accessibility work that ends up inside a usable interface',
      summary:
        'SignFusion matters to me because the model is only part of the story. The real value is translating speech and text into a browser experience someone can actually use.',
      readout:
        'This node points to the kind of AI work I enjoy most: not just “the model works,” but a complete accessibility-minded flow where the output becomes part of a real interface.',
      reference: 'SignFusion · Vosk · MediaPipe · Browser-based ASL overlay',
      tags: ['Accessibility', 'Vosk', 'MediaPipe'],
    },
    {
      short: 'YOLOv8 billing',
      title: 'Computer vision tied to a clear user flow',
      summary:
        'The billing project is a practical vision system: detect products in real time, connect them to pricing logic, and make the whole thing usable through a front-end billing flow.',
      readout:
        'I like vision work when it is attached to a business action. This one was not just detection for its own sake; it was detection wired into a checkout experience.',
      reference: 'YOLOv8 · OpenCV · Python · Checkout / billing flow',
      tags: ['YOLOv8', 'OpenCV', 'Flask'],
    },
    {
      short: 'Forecasting',
      title: 'Forecasts that are compared, measured, and explained',
      summary:
        'I compare approaches, check evaluation metrics, and care about whether the result is understandable enough to be trusted.',
      readout:
        'With forecasting, I care less about sounding impressive and more about whether the model choice, comparison, and result actually make sense to the person reading it.',
      reference: 'ARIMA · SARIMA · LSTM · Carbon forecasting app',
      tags: ['ARIMA', 'LSTM', 'Evaluation'],
    },
  ],
  data: [
    {
      short: 'Warehouse',
      title: 'Data models designed around real reporting needs',
      summary:
        'The warehouse work is not just about tables. It is about structuring information in a way that supports supplier, revenue, and product analysis properly.',
      readout:
        'This is the foundation piece: taking a messy reporting problem and giving it a schema that can support the questions the business actually wants answered.',
      reference: 'METRO retail warehouse · Star schema · Product / supplier analysis',
      tags: ['Star schema', 'Retail data', 'Modelling'],
    },
    {
      short: 'ETL flow',
      title: 'ETL logic built for consistency and repeatability',
      summary:
        'I like the layer where extraction, transformation, and loading stop being abstract and start becoming dependable enough for recurring use.',
      readout:
        'This node is about the less flashy part of the work that usually matters most: getting data from source to usable structure in a way that is reliable and understandable.',
      reference: 'SQL · Java · MESHJOIN · Structured ETL flow',
      tags: ['SQL', 'Java', 'ETL'],
    },
    {
      short: 'Reporting',
      title: 'Outputs a team can actually use to make decisions',
      summary:
        'Dashboards, summaries, and reporting logic should answer business questions clearly instead of just proving that the pipeline works.',
      readout:
        'A pipeline is only half-finished if the final output is hard to read. I care about making the reporting layer clear enough that someone can act on it quickly.',
      reference: 'Revenue visibility · Supplier reporting · BI-ready outputs',
      tags: ['BI', 'Revenue', 'Suppliers'],
    },
  ],
  web: [
    {
      short: 'This portfolio',
      title: 'A premium interface that still feels clear and usable',
      summary:
        'This site itself is part of the work: motion, hierarchy, contrast, and pacing used to make the experience feel considered rather than noisy.',
      readout:
        'I wanted this portfolio to feel cinematic without losing clarity. The goal is not to throw effects everywhere, but to make the motion and layout support the message.',
      reference: 'React · R3F · GSAP-style pacing · Product storytelling',
      tags: ['React', '3D interaction', 'Storytelling UI'],
    },
    {
      short: 'Tishnagii',
      title: 'Founder-led storefront thinking with real operational context',
      summary:
        'Running Tishnagii taught me how much presentation, navigation, stock flow, and fulfilment matter when you are the person responsible for the brand, not just the mockup.',
      readout:
        'This is where the presentation side of my work became practical. It was not only visual direction; it was learning how brand, storefront, inventory, and operations connect.',
      reference: 'Founder brand · Storefront thinking · Inventory and fulfilment',
      tags: ['Storefront', 'Brand direction', 'Fulfilment'],
    },
    {
      short: 'Blndr',
      title: 'Luxury direction built around contrast and restraint',
      summary:
        'The Blndr work is a good example of the visual standard I like: stronger contrast, quieter layouts, better product focus, and a more premium feel overall.',
      readout:
        'This node is about visual taste and execution: how to make a site feel elevated through spacing, contrast, motion, and product-first presentation.',
      reference: 'Luxury web direction · Product storytelling · High-end layout',
      tags: ['Contrast', 'Layout', 'Premium feel'],
    },
  ],
  tooling: [
    {
      short: 'Order flow',
      title: 'Structuring founder workflows so operations stay manageable',
      summary:
        'Useful tooling often starts with understanding where time gets lost: order handling, inventory updates, fulfilment steps, and the handoffs in between.',
      readout:
        'For me, this kind of work is about reducing friction in the day-to-day operation. If the workflow is messy, the best code in the world will not save it.',
      reference: 'Tishnagii · Orders · Inventory flow · Fulfilment steps',
      tags: ['Orders', 'Inventory', 'Workflow'],
    },
    {
      short: 'Report helper',
      title: 'Smaller tools that turn raw activity into something readable',
      summary:
        'Sometimes the right tool is not big at all. It is a compact helper that turns repeated manual work into a cleaner summary or a faster routine.',
      readout:
        'This node is the practical side of the work: scripts, helpers, or lightweight tools that save time and make recurring business or ops tasks easier to review.',
      reference: 'Reporting automation · ETL support · Decision-ready summaries',
      tags: ['Automation', 'Reporting', 'Utilities'],
    },
    {
      short: 'Ops automation',
      title: 'Removing repetitive steps that should not stay manual',
      summary:
        'From QA helpers to operational checklists, I like building the small systems that quietly save hours and reduce avoidable human error.',
      readout:
        'A lot of useful work is not glamorous. It is automating the repeatable steps, tightening the routine, and making sure the same avoidable mistakes do not keep happening.',
      reference: 'Checklists · Helper scripts · Process tightening',
      tags: ['Ops', 'Checklists', 'Time saved'],
    },
  ],
  clarity: [
    {
      short: 'Acceptance',
      title: 'Requirements broken into something a team can actually execute',
      summary:
        'Acceptance criteria, coverage notes, and structured checklists help reduce ambiguity before the work starts drifting.',
      readout:
        'This node is about taking fuzzy requests and turning them into concrete coverage or delivery thinking. It saves time later because the team knows what “done” means earlier.',
      reference: 'Acceptance criteria · Scope clarity · Edge-case coverage',
      tags: ['Scope', 'Coverage', 'Criteria'],
    },
    {
      short: 'Reports',
      title: 'Testing notes and reports that are worth reading',
      summary:
        'Good documentation should make decisions easier, not just satisfy a process step. I try to write with that in mind.',
      readout:
        'I care a lot about whether documentation is actually useful. A report should help someone decide, prioritise, or understand risk faster.',
      reference: 'Testing reports · Findings · Traceability',
      tags: ['Reports', 'Findings', 'Traceability'],
    },
    {
      short: 'Handoffs',
      title: 'Cleaner communication across product, design, engineering, and QA',
      summary:
        'I am comfortable acting as the person who reduces confusion between teams and turns fuzzy discussion into clearer next steps.',
      readout:
        'Some of the most valuable work is simply being the person who can connect the dots across functions and reduce ambiguity before it becomes rework.',
      reference: 'Product · Design · Engineering · QA handoff',
      tags: ['Cross-functional', 'Communication', 'Delivery'],
    },
  ],
};

export function CapabilitiesSection({ capabilities }) {
  const [selectedKey, setSelectedKey] = useState(capabilities[0]?.key ?? 'qa');
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);

  const activeCapability = useMemo(
    () => capabilities.find((capability) => capability.key === selectedKey) ?? capabilities[0],
    [capabilities, selectedKey],
  );

  const insights = useMemo(
    () => capabilityInsights[activeCapability?.key] ?? capabilityInsights.qa,
    [activeCapability],
  );

  useEffect(() => {
    setActiveInsightIndex(0);
  }, [selectedKey]);

  const activeInsight = insights[activeInsightIndex] ?? insights[0];

  return (
    <section className="section section--accent" id="capabilities">
      <div className="container">
        <SectionHeading
          kicker="Capabilities"
          title="A more useful way to show what I actually know how to do."
          body="Each scene below is tied to real work from my CV and portfolio. The interaction is there to reveal how I think about the work in practice, not just to decorate the page."
        />

        <div className="systems-lab reveal">
          <div className="systems-lab__copy spotlight-card" data-accent={activeCapability.accent}>
            <div className="systems-lab__eyebrow-wrap">
              <span className="systems-lab__eyebrow">Interactive systems view</span>
              <span className="systems-lab__accent" data-accent={activeCapability.accent}>
                {activeCapability.kicker}
              </span>
            </div>

            <h3>{activeCapability.title}</h3>
            <p className="systems-lab__summary">{activeCapability.description}</p>
            <p className="systems-lab__detail">{activeCapability.detail}</p>

            <div className="systems-lab__stat-row">
              {activeCapability.stats?.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="systems-lab__inspector">
              <span className="systems-lab__inspector-kicker">Selected node</span>
              <div className="systems-lab__inspector-head">
                <strong>{activeInsight.title}</strong>
                <span>{String(activeInsightIndex + 1).padStart(2, '0')}</span>
              </div>
              <p>{activeInsight.summary}</p>
              <div className="systems-lab__inspector-tags">
                {activeInsight.tags?.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <ul className="systems-lab__points">
              {activeCapability.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="systems-lab__visual spotlight-card" data-accent={activeCapability.accent}>
            <div className="systems-lab__visual-top">
              <span>Tap a node, drag the scene, or use the chips below</span>
              <strong>{activeCapability.kicker}</strong>
            </div>
            <Suspense fallback={<div className="system-lab-scene system-lab-scene--fallback" />}>
              <SystemLabScene
                capability={activeCapability}
                insights={insights}
                activeInsightIndex={activeInsightIndex}
                onSelectInsight={setActiveInsightIndex}
              />
            </Suspense>
            <div className="systems-lab__node-tabs" role="tablist" aria-label={`${activeCapability.title} interactive nodes`}>
              {insights.map((insight, index) => (
                <button
                  key={`${activeCapability.key}-${insight.short}`}
                  type="button"
                  className={`systems-lab__node-tab ${index === activeInsightIndex ? 'is-active' : ''}`.trim()}
                  data-accent={activeCapability.accent}
                  aria-pressed={index === activeInsightIndex}
                  onClick={() => setActiveInsightIndex(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {insight.short}
                </button>
              ))}
            </div>
            <div className="systems-lab__scene-readout" data-accent={activeCapability.accent}>
              <div className="systems-lab__scene-readout-head">
                <div>
                  <span className="systems-lab__scene-readout-kicker">Scene reference</span>
                  <strong>{activeInsight.short}</strong>
                </div>
                <span className="systems-lab__scene-readout-index">Node {String(activeInsightIndex + 1).padStart(2, '0')}</span>
              </div>
              <p>{activeInsight.readout}</p>
              <div className="systems-lab__scene-readout-foot">
                <em>{activeInsight.reference}</em>
                <div className="systems-lab__scene-readout-tags">
                  {activeInsight.tags?.map((tag) => (
                    <span key={`${activeInsight.short}-${tag}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="capability-grid capability-grid--interactive">
          {capabilities.map((capability) => (
            <button
              key={capability.title}
              type="button"
              className={`capability-card tilt-card spotlight-card reveal ${selectedKey === capability.key ? 'is-active' : ''}`.trim()}
              data-accent={capability.accent}
              onClick={() => setSelectedKey(capability.key)}
              onMouseEnter={() => setSelectedKey(capability.key)}
            >
              <span className="capability-card__kicker">{capability.kicker}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul>
                {capability.points.slice(0, 3).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

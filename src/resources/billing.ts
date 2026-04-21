// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Billing extends APIResource {
  /**
   * Create a Stripe Billing Portal session for the authenticated user.
   *
   * This allows users to:
   *
   * - View invoices
   * - Update payment methods
   * - Cancel/modify subscriptions
   *
   * Args: return_url: URL to return to after leaving portal
   *
   * Returns: { "url": "https://billing.stripe.com/..." }
   */
  createBillingPortalSession(
    params: BillingCreateBillingPortalSessionParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { return_url } = params ?? {};
    return this._client.post('/v1/billing/portal', { query: { return_url }, ...options });
  }

  /**
   * Create a Stripe Checkout session for the authenticated user.
   *
   * This endpoint:
   *
   * 1. Gets or creates a Stripe customer for the user
   * 2. Looks up the plan and its Stripe Price ID
   * 3. Creates a Checkout session
   * 4. Returns the session URL for redirect
   *
   * Args: plan_id: The plan to subscribe to (e.g., 'pro', 'max') billing_interval:
   * 'month' or 'year' success_url: URL to redirect after successful payment
   * cancel_url: URL to redirect if user cancels
   *
   * Returns: { "session*id": "cs*...", "url": "https://checkout.stripe.com/..." }
   */
  createCheckoutSession(
    params: BillingCreateCheckoutSessionParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { plan_id, billing_interval, cancel_url, success_url } = params;
    return this._client.post('/v1/billing/checkout', {
      query: { plan_id, billing_interval, cancel_url, success_url },
      ...options,
    });
  }

  /**
   * Handle Stripe webhook events directly in Nebula API.
   *
   * Validates webhook signature and processes events:
   *
   * - customer.subscription.created
   * - customer.subscription.updated
   * - customer.subscription.deleted
   * - invoice.payment_succeeded
   * - invoice.payment_failed
   *
   * This is the single source of truth for subscription updates.
   */
  handleWebhook(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/billing/webhook', options);
  }
}

export type BillingCreateBillingPortalSessionResponse = unknown;

export type BillingCreateCheckoutSessionResponse = unknown;

export type BillingHandleWebhookResponse = unknown;

export interface BillingCreateBillingPortalSessionParams {
  return_url?: string | null;
}

export interface BillingCreateCheckoutSessionParams {
  plan_id: string;

  billing_interval?: string;

  cancel_url?: string | null;

  success_url?: string | null;
}

export declare namespace Billing {
  export {
    type BillingCreateBillingPortalSessionResponse as BillingCreateBillingPortalSessionResponse,
    type BillingCreateCheckoutSessionResponse as BillingCreateCheckoutSessionResponse,
    type BillingHandleWebhookResponse as BillingHandleWebhookResponse,
    type BillingCreateBillingPortalSessionParams as BillingCreateBillingPortalSessionParams,
    type BillingCreateCheckoutSessionParams as BillingCreateCheckoutSessionParams,
  };
}

  {productIds && (
                    <p>
                      If you&apos;re looking for a product, I recommend:{' '}
                      <LocalizedProductLink
                        productIds={productIds}
                        products={products}
                      />{' '}
                      or try our{' '}
                      <Link href="/porosity-quiz" className="link link-primary">
                        Porosity Quiz
                      </Link>{' '}
                      for personalized recommendations.
                    </p>
                  )}
                </div>

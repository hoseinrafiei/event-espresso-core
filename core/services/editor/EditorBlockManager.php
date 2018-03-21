<?php

namespace EventEspresso\core\services\editor;

use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\entities\editor\EditorBlockCollection;
use EventEspresso\core\domain\entities\editor\EditorBlockInterface;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\request\RequestInterface;


defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EditorBlockManager
 * Description
 *
 * @package EventEspresso\core\services\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class EditorBlockManager
{

    /**
     * @var CollectionInterface|EditorBlockInterface[] $blocks
     */
    protected $blocks;

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var DomainInterface $domain
     */
    protected $domain;

    /**
     * the post type that the current request applies to
     *
     * @var string $request_post_type
     */
    protected $request_post_type;

    /**
     * value of the 'page' $_GET param
     *
     * @var string $page
     */
    protected $page;

    /**
     * value of the 'action' $_GET param
     *
     * @var string $action
     */
    protected $action;

    /**
     * EditorBlockManager constructor.
     *
     * @param EditorBlockCollection $blocks
     * @param RequestInterface      $request
     * @param DomainInterface       $domain
     */
    public function __construct(EditorBlockCollection $blocks, RequestInterface $request, DomainInterface $domain)
    {
        $this->blocks  = $blocks;
        $this->request = $request;
        $this->domain  = $domain;
        $this->request_post_type = $this->request->getRequestParam('post_type', '');
        $this->page = $this->request->getRequestParam('page', '');
        $this->action = $this->request->getRequestParam('action', '');
        add_action($this->init_hook(), array($this, 'initialize'));
    }


    /**
     *  Returns the name of a hookpoint to be used to call initialize()
     *
     * @return string
     */
    abstract public function init_hook();


    /**
     * Perform any early setup required for block editors to functions
     *
     * @return void
     */
    abstract public function initialize();


    /**
     * @return string
     */
    public function currentRequestPostType()
    {
        return $this->request_post_type;
    }


}